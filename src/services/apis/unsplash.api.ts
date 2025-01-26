import { useState, useEffect } from "react";
import generateApis from "../generate.api";

export const useRandomImage = (): string => {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoYXR0aW5nfGVufDB8fDB8fHww"
  );

  const fetchRandomImage = async () => {
    try {
      const res = await generateApis("/auth/get-random-img").getOne();
      setImageUrl(res.imageUrl);
    } catch (error) {
      console.error("Error fetching random image:", error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  return imageUrl;
};
