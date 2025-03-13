function DrizzleAnimation() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-blue-300 opacity-50 w-0.5 rounded-full drizzle-animation"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 10}%`,
            height: `${Math.random() * 10 + 5}px`,
            animationDuration: `${Math.random() * 2 + 1}s`,
            animationDelay: `${Math.random() * 3}s`,
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

export default DrizzleAnimation;
