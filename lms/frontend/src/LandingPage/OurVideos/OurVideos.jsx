import { useEffect, useState } from "react";

export default function OurVideos() {
  const [videos, setVideos] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getYoutubeVideo`);
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const visibleVideos = showAll ? videos : videos.slice(0, 3);

  return (
    <section className="py-10 px-4 flex flex-col items-center space-y-10">
      <h1 className="headingarea text-center py-4">Our Videos</h1>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        {visibleVideos.map((video) => (
          <div
            key={video.id}
            className="flex flex-col items-center text-center w-full sm:w-auto max-w-[400px] flex-shrink-0"
          >
            <div className="w-full aspect-video">
              <iframe
                src={video.yotubelLink}
                className="w-full h-full rounded-lg shadow-lg"
                allowFullScreen
              />
            </div>
            <p className="text-[#001040] font-medium text-base sm:text-lg px-2 mt-2">
              {video.title}
            </p>
          </div>
        ))}
      </div>

      {videos.length > 3 && (
        <p
          onClick={() => setShowAll(!showAll)}
          className="underline text-[#001040] font-medium cursor-pointer"
        >
          {showAll ? "Collapse" : "View All"}
        </p>
      )}
    </section>
  );
}
