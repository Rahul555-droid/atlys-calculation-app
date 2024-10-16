export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export const getPosition = (ref : any) => {
  try{
    const rect = ref.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }
  catch{
    return {
      x: 0,
      y: 0,
    };
  }

};

