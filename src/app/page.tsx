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
import LikeButton from "@/components/LikeButton";

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

  const handleSubmit = async (e: any) => {
    try {
      await axios.post("/api", { authorId: authorId, text: text });
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de l'envoi de la requête:",
        error
      );
    }
  };

  return (
    <div className="container py-8">
      <div className="w-full p-8 flex justify-center items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="m-auto align-middle justify-center">
              Ajouter une citation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
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
                  <LikeButton like={item.likes} id={item.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
