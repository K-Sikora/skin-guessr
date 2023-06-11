const BackgroundPlayer = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <video
        className="w-full h-full object-cover"
        muted
        loop
        autoPlay
        src="./bg.mp4"
      ></video>
      <div className="absolute bg-black/60 w-full h-full top-0 left-0"></div>
    </div>
  );
};

export default BackgroundPlayer;
