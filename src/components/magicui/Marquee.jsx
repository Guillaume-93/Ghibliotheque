import PropTypes from "prop-types";

export default function Marquee({
  className = "",
  reverse = false,
  duration = "30s",
  children,
  vertical = false,
  repeat = 2,
  ...props
}) {
  const baseClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div
      {...props}
      className={`group flex overflow-hidden ${vertical ? "flex-col" : "flex-row"} ${className}`}
    >
      <div
        className={`flex ${baseClass} ${vertical ? "flex-col" : "flex-row"}`}
        style={{ animationDuration: duration }}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex shrink-0">
              {children}
            </div>
          ))}
      </div>
    </div>
  );
}

Marquee.propTypes = {
  className: PropTypes.string,
  reverse: PropTypes.bool,
  duration: PropTypes.string,
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
  repeat: PropTypes.number,
};
