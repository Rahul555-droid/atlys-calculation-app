interface CustomChipProps {
    text: string
    style?: React.CSSProperties
    className?: string
  }
  
  const CustomChip: React.FC<CustomChipProps> = ({ text, style, className }) => {
    return text ? (
      <div
        className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-white font-small ${className}`}
        style={style}
      >
        {text}
      </div>
    ) : null
  }
  
  export default CustomChip