import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 

interface ReturnButtonProps {
  href: string;
  label: string;
}

export const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  return (
    <Link
      href={href}
      className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
    >
      <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
      {label}
    </Link>
  );
};