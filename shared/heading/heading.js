function Heading({ level, text, color, className, center = false }) {
  const styles = {
    fontSize: getHeadingFontSize(level),
    color: color || "#000",
    textAlign: center ? "center" : "left",
    fontWeight: "600",
  };

  function getHeadingFontSize(level) {
    switch (level) {
      case 1:
        return "32px";
      case 2:
        return "24px";
      case 3:
        return "20px";
      case 4:
        return "16px";
      case 5:
        return "14px";
      case 6:
        return "12px";
      default:
        return "16px";
    }
  }

  const HeadingTag = `h${level}`;
  return (
    <HeadingTag style={styles} className={className}>
      {text}
    </HeadingTag>
  );
}

export default Heading;
