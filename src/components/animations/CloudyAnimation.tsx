function CloudyAnimation() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-80 cloudy-animation"
          style={{
            left: `${Math.random() * 120 - 20}%`,
            top: `${Math.random() * 120 - 20}%`,
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 150 + 100}px`,
            animationDuration: `${Math.random() * 100 + 50}s`,
            animationDelay: `${Math.random() * 10}s`,
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

export default CloudyAnimation;
