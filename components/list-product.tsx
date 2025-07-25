import { formatToDate, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductsProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProducts({
  title,
  price,
  created_at,
  photo,
  id,
}: ListProductsProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-lg overflow-hidden">
        <Image src={photo} alt={title} className="object-cover" fill />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {formatToDate(created_at)}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
