import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LogoProps {
  width?: string;
  height?: string;
}

const Logo: React.FC<LogoProps> = ({ width = "40px", height = "35px" }) => {
  return (
    <DotLottieReact
      src="https://lottie.host/e8ee6ca1-fc6e-44bf-88e6-49e9dc688b54/u95BiJBsBl.lottie"
      loop
      autoplay
      style={{ width, height }}
    />
  );
};

export default Logo;
