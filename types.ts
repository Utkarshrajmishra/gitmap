export interface CommitNode {
  id: string;
  message: string;
  sha: string;
  author: string;
  date: string;
}

export interface BranchData {
  name: string;
  commits: CommitNode[];
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}
