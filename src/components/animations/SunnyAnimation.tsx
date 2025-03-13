function SunnyAnimation() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-yellow-200 rounded-full opacity-70 sunny-animation"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

export default SunnyAnimation;
