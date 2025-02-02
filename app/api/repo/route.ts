import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { z } from "zod";

const querySchema = z.object({
  username: z.string().min(1),
  repo: z.string().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const repo = searchParams.get("repo");

    const query = querySchema.parse({ username, repo });

    const octokit = new Octokit();

    // Fetch branches
    const { data: branchesData } = await octokit.request(
      "GET /repos/{owner}/{repo}/branches",
      {
        owner: query.username,
        repo: query.repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    // Fetch commits for each branch
    const branchesWithCommits = await Promise.all(
      branchesData.map(async (branch) => {
        const { data: commitsData } = await octokit.request(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner: query.username,
            repo: query.repo,
            sha: branch.name,
            per_page: 10,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        const commits = commitsData.map((commit) => ({
          id: commit.sha,
          message: commit.commit.message,
          sha: commit.sha,
          author: commit.commit.author?.name || "Unknown",
          date: commit.commit.author?.date || new Date().toISOString(),
        }));

        return {
          name: branch.name,
          commits,
        };
      })
    );

    return NextResponse.json(branchesWithCommits,{
        status:200
    });
  } catch (error) {
    console.error("Error fetching repository data:", error);
    return NextResponse.json(
      {
        error:
          "Error fetching repository data. Please check the username and repository name.",
      },
      { status: 400 }
    );
  }
}
