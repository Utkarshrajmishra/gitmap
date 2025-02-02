import { GitPullRequestArrow } from "lucide-react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="absolute px-10 mt-8  font-jakarta top-0 left-0 right-0 z-10">
      <ul className="flex items-center justify-between w-full">
        <li className="text-white font-jakarta flex gap-2 items-center">
          <div className="text-white bg-[#4e152f] h-fit w-fit p-2 rounded-xl">
            <GitPullRequestArrow />
          </div>
          <p className="text-2xl font-bold">GitMap</p>
        </li>
        <li>
          <Button className="bg-[#4e152f] font-jakarta border border-[#5c2c42] hover:bg-[#330c1e]">
            {" "}
            <ArrowUp /> Upvote Us PeerList
          </Button>
        </li>
      </ul>
    </nav>
  );
};


export default Navbar