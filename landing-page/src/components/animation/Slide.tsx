import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";


const SlideIn: React.FC = ({ children, id, prevSection }: any) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ y: 0, opacity: 1, transition: { duration: 2 } });
  }, [controls]);

  

  return (
    <motion.div
      initial={{ y: prevSection > id? -100: 100, opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
