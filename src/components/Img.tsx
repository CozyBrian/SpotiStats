import React, { useState } from "react";
import { motion } from "framer-motion";

type ImgProps = {
  src?: string | undefined;
  alt?: string | undefined;
  className?: string | undefined;
  reff?: React.RefObject<HTMLImageElement>;
};

const Img = React.memo(({ src, alt, className, reff }: ImgProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.img
      ref={reff}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      exit={{ opacity: 0 }}
      onLoad={() => setLoaded(true)}
      className={className}
      src={src}
      alt={alt}
    />
  );
});

export default Img;
