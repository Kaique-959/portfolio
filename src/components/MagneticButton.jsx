import useMagneticEffect from '../hooks/useMagneticEffect'

export default function MagneticButton({ children, className = '', href, ...props }) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticEffect(80, 0.2)

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      {...props}
    >
      {children}
    </Tag>
  )
}
