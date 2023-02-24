export type TButton = {
  onPress: () => void;
  text: string;
  className?: string;
};

export type TTabButton = {
  onPress: () => void;
  icon: React.ReactNode;
  active: boolean;
};
