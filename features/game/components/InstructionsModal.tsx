"use client";

import { useEffect } from "react";
import { CheckCircle, Edit3, Puzzle, Lightbulb, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { setInstructionsSeen } from "../lib/storage";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructionsModal({
  isOpen,
  onClose,
}: InstructionsModalProps) {
  useEffect(() => {
    if (isOpen) {
      setInstructionsSeen(true);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] lg:max-w-7xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-amber-950/98 to-red-950/98 backdrop-blur-xl border-4 border-amber-500/60 shadow-2xl [&>button]:hidden">
        <DialogHeader className="relative">
          {/* Custom Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 z-50 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-amber-300 rounded-full p-3 shadow-lg border-2 border-amber-500/50 transition-all hover:scale-110 hover:rotate-90"
            aria-label="Đóng"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <DialogTitle className="text-5xl font-bold text-amber-300 flex items-center gap-4 pr-12">
            <Trophy className="w-12 h-12 text-amber-400" />
            Hướng dẫn chơi
          </DialogTitle>
          <DialogDescription className="text-amber-200/90 text-xl pt-2">
            Làm theo 3 bước để hoàn thành trò chơi và lên bảng xếp hạng
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Stage 1 */}
          <div className="group hover:scale-[1.01] transition-transform">
            <div className="bg-gradient-to-br from-red-900/40 to-red-950/40 backdrop-blur-sm rounded-xl p-8 border-2 border-red-500/50 shadow-xl">
              <div className="flex items-start gap-5 mb-4">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-amber-300">
                      Màn 1: Trắc nghiệm
                    </h3>
                    <Badge className="bg-amber-500 text-amber-950 text-base px-3 py-1">
                      10 mảnh
                    </Badge>
                  </div>
                  <ul className="space-y-3 text-white/90 text-base">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-xl mt-0.5">
                        ★
                      </span>
                      <span>
                        Trả lời câu hỏi trắc nghiệm về đường lối kháng chiến
                        toàn quốc (1946 - 1950)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-xl mt-0.5">
                        ★
                      </span>
                      <span>Chọn đáp án đúng trong 4 lựa chọn A, B, C, D</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-xl mt-0.5">
                        ★
                      </span>
                      <span>Mỗi câu đúng nhận 1 mảnh ghép, có 2 lần thử</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="group hover:scale-[1.01] transition-transform">
            <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/40 backdrop-blur-sm rounded-xl p-8 border-2 border-amber-500/50 shadow-xl">
              <div className="flex items-start gap-5 mb-4">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl shadow-lg">
                  <Edit3 className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-amber-300">
                      Màn 2: Điền từ
                    </h3>
                    <Badge className="bg-amber-500 text-amber-950 text-base px-3 py-1">
                      5 mảnh
                    </Badge>
                  </div>
                  <ul className="space-y-3 text-white/90 text-base">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-xl mt-0.5">
                        ★
                      </span>
                      <span>Hoàn thành câu hỏi điền từ vào chỗ trống</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-xl mt-0.5">
                        ★
                      </span>
                      <span>
                        Nhập đáp án chính xác (không phân biệt hoa thường)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-xl mt-0.5">
                        ★
                      </span>
                      <span>Mỗi câu đúng nhận 1 mảnh ghép, có 2 lần thử</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="group hover:scale-[1.01] transition-transform">
            <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-950/40 backdrop-blur-sm rounded-xl p-8 border-2 border-yellow-500/50 shadow-xl">
              <div className="flex items-start gap-5 mb-4">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 rounded-xl shadow-lg">
                  <Puzzle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-amber-300">
                      Màn 3: Ghép hình
                    </h3>
                    <Badge className="bg-amber-500 text-amber-950 text-base px-3 py-1">
                      15 mảnh
                    </Badge>
                  </div>
                  <ul className="space-y-3 text-white/90 text-base">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-xl mt-0.5">
                        ★
                      </span>
                      <span>
                        Sử dụng 15 mảnh ghép đã thu thập để hoàn thành bức tranh
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-xl mt-0.5">
                        ★
                      </span>
                      <span>
                        Kéo và thả mảnh ghép vào đúng vị trí trên bảng
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-xl mt-0.5">
                        ★
                      </span>
                      <span>Mảnh ghép tự động khóa khi đặt đúng chỗ</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-amber-500/30" />

          {/* Tips */}
          <div className="bg-gradient-to-br from-amber-800/30 to-red-900/30 backdrop-blur-sm rounded-xl p-8 border-2 border-amber-400/40">
            <div className="flex items-center gap-4 mb-6">
              <Lightbulb className="w-8 h-8 text-amber-400" />
              <h3 className="text-2xl font-bold text-amber-300">
                Mẹo chơi hiệu quả
              </h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-white/90">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-xl">✓</span>
                <span>Đọc kỹ câu hỏi trước khi trả lời</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-xl">✓</span>
                <span>Thời gian chơi ảnh hưởng đến xếp hạng</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-xl">✓</span>
                <span>Có thể tạm dừng game bất cứ lúc nào</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-xl">✓</span>
                <span>Càng đúng nhiều, điểm càng cao</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-amber-300 font-bold text-2xl py-8 shadow-2xl shadow-red-900/60 border-4 border-amber-500/60 hover:scale-[1.02] transition-all hover:shadow-amber-500/30"
            size="lg"
          >
            <Trophy className="w-7 h-7 mr-3" />
            Đã hiểu, bắt đầu chơi ngay! 🎮
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
