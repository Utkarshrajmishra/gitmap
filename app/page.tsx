"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlay, Loader } from "lucide-react";
import Navbar from "@/components/Navbar";
import { CommitContext } from "@/context/CommitContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { setCommitData } = useContext(CommitContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    repo: "",
  });

  const getBranch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/repo?username=${data.username}&repo=${data.repo}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch repository data");
      }

      const result = await response.json();
      setCommitData(result);
      router.push("/mindmap");
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className=" h-[100vh]  w-full bg-gradient-to-b from-custom-3 via-custom-4 via-custom-5 via-custom-6 via-custom-7 via-custom-8 via-custom-9 via-custom-10 via-custom-11 via-custom-12 via-custom-13 via-custom-14 via-custom-15 via-custom-16 via-custom-17 via-custom-18 via-custom-19 via-custom-20 via-custom-21 to-black md:p-8 p-2 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <Navbar />

      <main className="relative flex flex-col items-center justify-center h-screen">
        <div>
          <p className="border border-neutral-400 font-inter text-white text-sm bg-black rounded-2xl py-1 px-6 ">
            Start Visualizing Your Repos ✨
          </p>
        </div>

        <div className="flex mt-8 flex-col">
          <h1 className="text-5xl z-20 font-bold md:tracking-tighter text-center text-white sm:text-5xl md:text-6xl lg:text-7xl font-jakarta md:leading-loose">
            Visualize Your GitHub Repos <br /> Like Never Before With{" "}
            <span className="bg-[#924467] text-transparent bg-clip-text">
              GitMap
            </span>
          </h1>
          <p className="mt-6 md:hidden text-md px-3 md:text-lg text-center leading-wide text-neutral-400 font-inter">
            Unlock the power of your GitHub repository with GitMap! Seamlessly
            map out branches and commits into an interactive mind map. Start
            exploring your codebase in a whole new way!
          </p>
          <p className="mt-6 hidden md:inline-block text-sm px-3 md:text-lg text-center leading-wide text-neutral-400 font-inter">
            Unlock the power of your GitHub repository with GitMap! Seamlessly
            map out branches and commits into an <br /> interactive mind map. Start
            exploring your codebase in a whole new way!
          </p>
        </div>

        <div className="mt-8 flex-col md:flex-row flex gap-5 md:gap-4 ">
          <Input
            type="text"
            name="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            placeholder="Github username"
            className="text-sm w-[300px]  border   text-white border-[#5c2c42] md:h-11 h-10 bg-custom-5/20 md:w-[250px] bg-[#471f31] placeholder:text-zinc-300"
          />
          <Input
            type="text"
            placeholder="Github repo name"
            name="repo"
            onChange={(e) => setData({ ...data, repo: e.target.value })}
            value={data.repo}
            className="border border-[#5c2c42] text-white md:h-11 h-10 bg-custom-5/20 md:w-[250px] bg-[#471f31] placeholder:text-zinc-300 text-sm md:text-md"
          />
          <Button
            onClick={getBranch}
            className="md:h-11 h-10 border border-[#5c2c42] bg-[#4e152f] hover:bg-[#3a081f] text-white w-full  md:w-[150px] flex gap-2 items-center"
          >
            {isLoading ? (
              <div className="animate-spin">
                <Loader />
              </div>
            ) : (
              <>
                <CirclePlay className="w-5 h-5" />
                Generate Map
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
