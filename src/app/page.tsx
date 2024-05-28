"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HeartIcon } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateQuoteForm from "@/components/CreateQuote";

export default function Home() {
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchQuotes = async () => {
      const res = await axios.get("/api");
      setData(res.data);
    };
    fetchQuotes();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios.post("/api", { authorId, text });
  };

  return (
    <div className="py-8">
      <div className="w-full p-8 flex justify-center items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="m-auto align-middle justify-center">
              Ajouter une citation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajout citation</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <CreateQuoteForm
                onQuoteChange={setText}
                onAuthorChange={setAuthorId}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4 p-8">
        {data.map((item: any) => (
          <Card
            key={item.id}
            className="bg-white dark:bg-gray-950 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardContent className="p-6 space-y-4">
              <div className="text-gray-500 dark:text-gray-400 italic text-lg">
                &ldquo; {item.text} &rdquo;
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  -{item.author.name}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                    size="icon"
                    variant="ghost"
                  >
                    <HeartIcon className="w-5 h-5" />
                    <span className="sr-only">Like</span>
                  </Button>
                  {item.likes}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
