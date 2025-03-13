import RainAnimation from "./RainAnimation";

function ThunderstormAnimation() {
  return (
    <div className="absolute inset-0">
      <RainAnimation />
      <div className="absolute inset-0 bg-yellow-300 opacity-0 thunderstorm-animation"></div>
    </div>
  );
}

export default ThunderstormAnimation;
