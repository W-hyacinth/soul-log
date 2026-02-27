interface VideoProps {
  src: string;
  caption?: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

export function Video({ src, caption }: VideoProps) {
  const youtubeId = getYouTubeId(src);

  return (
    <figure className="my-6">
      {youtubeId ? (
        <div className="relative w-full overflow-hidden rounded-md border border-notion-border" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={caption ?? "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      ) : (
        <video
          src={src}
          controls
          playsInline
          className="w-full rounded-md border border-notion-border"
        >
          <track kind="captions" />
        </video>
      )}
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-notion-text-light">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
