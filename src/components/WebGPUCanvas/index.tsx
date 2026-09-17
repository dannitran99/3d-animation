import { useEffect, useRef } from 'react';

import redFragmentShader from './red.frag.wgsl?raw';
import trigandleVertexShader from './triangle.vert.wgsl?raw';

export default function WebGPUCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Đảm bảo code chỉ chạy ở Client-side và thiết bị có hỗ trợ WebGPU
    if (!canvasRef.current) return;
    if (!navigator.gpu) {
      console.error('WebGPU không được hỗ trợ trên trình duyệt này.');
      return;
    }

    let isDestroyed = false; // Cờ kiểm soát khi component unmount

    async function initWebGPU() {
      const canvas = canvasRef.current!;

      // 2. Khởi tạo GPU Adapter & Device
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        console.error('Không tìm thấy GPU Adapter phù hợp.');
        return;
      }
      const device = await adapter.requestDevice();

      // Kiểm soát nếu component bị unmount trước khi async hoàn thành
      if (isDestroyed) return;

      // 3. Cấu hình Canvas Context
      const context = canvas.getContext('webgpu') as GPUCanvasContext | null;
      if (!context) {
        console.error('Không thể lấy WebGPU Context từ Canvas.');
        return;
      }

      const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device: device,
        format: canvasFormat,
        alphaMode: 'opaque'
      });

      // 4. Tạo Shader Module
      const vertexModule = device.createShaderModule({
        code: trigandleVertexShader
      });
      const fragmentModule = device.createShaderModule({
        code: redFragmentShader
      });

      // 5. Tạo Render Pipeline (Định nghĩa cách vẽ)
      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: vertexModule,
          entryPoint: 'main'
        },
        fragment: {
          module: fragmentModule,
          entryPoint: 'main',
          targets: [{ format: canvasFormat }]
        },
        primitive: {
          topology: 'triangle-list'
        }
      });

      // 6. Hàm render chính
      function render() {
        if (isDestroyed) return;

        const commandEncoder = device.createCommandEncoder();
        const textureView = context!.getCurrentTexture().createView();

        const renderPassDescriptor: GPURenderPassDescriptor = {
          colorAttachments: [
            {
              view: textureView,
              clearValue: [0.1, 0.1, 0.1, 1.0], // Màu nền xám tối
              loadOp: 'clear',
              storeOp: 'store'
            }
          ]
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.draw(3); // Vẽ 3 đỉnh (1 hình tam giác)
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);

        // Nếu muốn làm animation, bỏ comment dòng dưới:
        // requestAnimationFrame(render);
      }

      render();
    }

    initWebGPU();

    // 7. Cleanup khi React Component bị hủy (Unmount)
    return () => {
      isDestroyed = true;
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="border border-slate-700 rounded-lg shadow-lg"
      />
    </div>
  );
}
