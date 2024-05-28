import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";

const LikeButton = ({ like, id }: any) => {
  const [liked, setLiked] = useState(() => {
    // Récupérer l'état du like du localStorage
    const savedLikes = localStorage.getItem("likes");
    const likes = savedLikes ? JSON.parse(savedLikes) : {};
    return likes[id] || false;
  });

  useEffect(() => {
    // Sauvegarder l'état du like dans le localStorage à chaque changement
    const savedLikes = localStorage.getItem("likes");
    const likes = savedLikes ? JSON.parse(savedLikes) : {};
    likes[id] = liked;
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [liked, id]);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <>
      <Button
        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
        size="icon"
        variant="ghost"
        onClick={handleClick}
      >
        <HeartIcon className={`w-5 h-5 ${liked ? "text-red-500" : ""}`} />
        <span className="sr-only">Like</span>
      </Button>{" "}
      {like}
    </>
  );
};
export default LikeButton;
