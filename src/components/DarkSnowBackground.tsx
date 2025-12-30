import './DarkSnowBackground.css';
import nightBg from '../assets/dark-mode.svg';

function DarkSnowBackground() {
  return (
    <div
      className="dark-snow-bg"
      style={{ backgroundImage: `url(${nightBg})` }}
    >
      {/* Snow layers */}
      <div className="snow layer1" />
      <div className="snow layer2" />
      <div className="snow layer3" />
    </div>
  );
}

export default DarkSnowBackground;
