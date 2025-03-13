function MistAnimation() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-40 mist-animation"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 400 + 200}px`,
            height: `${Math.random() * 300 + 100}px`,
            animationDuration: `${Math.random() * 60 + 30}s`,
            animationDelay: `${Math.random() * 10}s`,
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

export default MistAnimation;
