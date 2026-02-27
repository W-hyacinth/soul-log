import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { Video } from "./Video";

export const mdxComponents: MDXComponents = {
  // Custom components for MDX
  Callout,
  CodeBlock,
  Video,

  // Override default HTML elements
  img: (props) => {
    const src = typeof props.src === "string" ? props.src : undefined;
    const alt = props.alt ?? "";
    if (!src) return null;

    // Local images (public/) or external URLs: use next/image
    if (src.startsWith("/") || src.startsWith("http")) {
      return (
        <span className="block my-4">
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="(max-width: 720px) 100vw, 720px"
            className="rounded-md w-full h-auto"
            style={{ width: "100%", height: "auto" }}
          />
        </span>
      );
    }

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className="rounded-md max-w-full my-4" />;
  },

  a: (props) => (
    <a
      {...props}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  ),
};
