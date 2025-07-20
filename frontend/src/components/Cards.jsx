import './Card.css';

export default function Card({ image, title, link1, link2, icon1, icon2 }) {
  return (
    <div className="card">
        <div className="image-container">
            <div className="image-inner">
            <div className="image-front">
                <img src={image} alt={title} />
            </div>
            <div className="image-back">
                <a href={link1} target='blank'><img src={icon1} /></a>
                <a href={link2} target='blank'><img src={icon2} /></a>
            </div>
            </div>
        </div>
        <div className="card-title">{title}</div>
    </div>
  );
}
