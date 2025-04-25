export const formatNumber = num => {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T сўм'
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B сўм'
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M сўм'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K сўм'
  } else {
    return num + ' сўм'
  }
}

export const formatCount = num => {
  return num.toLocaleString()
}
