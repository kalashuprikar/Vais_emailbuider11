import React from "react";
import { FeaturesBlock } from "../types";
import { renderBlockToHTML } from "../utils";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturesBlockComponentProps {
  block: FeaturesBlock;
  isSelected: boolean;
  onUpdate: (block: FeaturesBlock) => void;
  onDuplicate?: (block: FeaturesBlock, position: number) => void;
  onDelete?: (blockId: string) => void;
  blockIndex?: number;
}

export const FeaturesBlockComponent: React.FC<FeaturesBlockComponentProps> = ({
  block,
  isSelected,
  onDuplicate,
  onDelete,
  blockIndex = 0,
}) => {
  const html = renderBlockToHTML(block);

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate?.(block, blockIndex + 1);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(block.id);
  };

  return (
    <div
      className={`w-full rounded-lg overflow-hidden ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
    >
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {isSelected && (
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2 shadow-sm mt-2 w-fit">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-gray-100"
            title="Duplicate this block"
            onClick={handleDuplicate}
          >
            <Copy className="w-3 h-3 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-red-100"
            title="Delete this block"
            onClick={handleDelete}
          >
            <Trash2 className="w-3 h-3 text-red-600" />
          </Button>
        </div>
      )}
    </div>
  );
};
