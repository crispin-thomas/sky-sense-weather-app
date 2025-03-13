function SnowAnimation() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full snow-animation"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 10}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

export default SnowAnimation;
