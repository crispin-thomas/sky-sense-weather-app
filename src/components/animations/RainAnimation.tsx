function RainAnimation() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-blue-500 opacity-70 w-0.5 rounded-full rain-animation"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 10}%`,
            height: `${Math.random() * 20 + 10}px`,
            animationDuration: `${Math.random() * 1 + 0.5}s`,
            animationDelay: `${Math.random() * 2}s`,
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

export default RainAnimation;
