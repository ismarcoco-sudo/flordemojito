"use client";

import React, { useState } from 'react';
import { Order, ShippingStatus, PaymentStatus } from '@/types/order';
import { X, Download, Truck, Tag, FileText, Loader2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const PAY_LABELS: Record<PaymentStatus, string> = {
  pending: 'Pendiente', paid: 'Pagado', failed: 'Fallido', refunded: 'Reembolsado',
};
const SHIP_LABELS: Record<ShippingStatus, string> = {
  pending_label: 'Pendiente etiqueta', label_generated: 'Etiqueta generada',
  in_transit: 'En tránsito', delivered: 'Entregado', incident: 'Incidencia',
};

export function OrderDetailModal({ order, onClose, onUpdate }: {
  order: Order;
  onClose: () => void;
  onUpdate: (o: Order) => void;
}) {
  const [note, setNote] = useState(order.internalNote || '');
  const [loading, setLoading] = useState(false);
  const [dpdLoading, setDpdLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const patch = async (updates: Partial<Order>) => {
    setLoading(true);
    const res = await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: order.id, ...updates }),
    });
    const data = await res.json();
    onUpdate(data.order);
    setLoading(false);
    setMsg('✅ Guardado');
    setTimeout(() => setMsg(''), 2000);
  };

  const generateLabel = async () => {
    setDpdLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/dpd/create-shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': process.env.NEXT_PUBLIC_INTERNAL_SECRET || '',
        },
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          manualData: {
            fullName: order.shippingAddress.fullName,
            address: order.shippingAddress.address,
            postalCode: order.shippingAddress.postalCode,
            city: order.shippingAddress.city,
            email: order.shippingAddress.email,
            phone: order.shippingAddress.phone,
            bottleCount: order.items.reduce((s, i) => s + i.quantity, 0),
          },
        }),
      });
      const data = await res.json();
      if (data.trackingNumber) {
        await patch({ trackingNumber: data.trackingNumber, labelUrl: data.labelUrl, shippingStatus: 'label_generated' });
        setMsg(`📦 Etiqueta creada — Tracking: ${data.trackingNumber}`);
      } else {
        setMsg('⚠️ DPD no disponible. Procesar manualmente.');
      }
    } catch {
      setMsg('❌ Error de conexión con DPD');
    }
    setDpdLoading(false);
  };

  const bottleCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="font-bold text-lg text-primary font-mono">{order.orderNumber}</h2>
            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString('es-ES')}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Status badges */}
          <div className="flex gap-3 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 mb-1">Estado de pago</p>
              <select
                value={order.paymentStatus}
                onChange={(e) => patch({ paymentStatus: e.target.value as PaymentStatus })}
                className="border rounded-lg px-3 py-1.5 text-sm"
              >
                {(Object.keys(PAY_LABELS) as PaymentStatus[]).map(s => (
                  <option key={s} value={s}>{PAY_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Estado de envío</p>
              <select
                value={order.shippingStatus}
                onChange={(e) => patch({ shippingStatus: e.target.value as ShippingStatus })}
                className="border rounded-lg px-3 py-1.5 text-sm"
              >
                {(Object.keys(SHIP_LABELS) as ShippingStatus[]).map(s => (
                  <option key={s} value={s}>{SHIP_LABELS[s]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Customer */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><FileText className="w-4 h-4" /> Datos del cliente</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-gray-500">Nombre:</span> {order.shippingAddress.fullName}</div>
              <div><span className="text-gray-500">Email:</span> {order.shippingAddress.email}</div>
              <div><span className="text-gray-500">Teléfono:</span> {order.shippingAddress.phone}</div>
              <div><span className="text-gray-500">Zona:</span> {order.shippingAddress.zone}</div>
              <div className="col-span-2"><span className="text-gray-500">Dirección:</span> {order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.province}</div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold text-sm mb-3">Productos ({bottleCount} botella{bottleCount !== 1 ? 's' : ''})</h3>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1.5 border-b border-gray-100">
                <span>{item.name} ×{item.quantity}</span>
                <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
            <div className="flex justify-between text-sm py-1.5 text-gray-500">
              <span>Envío</span>
              <span>{order.shippingCost === 0 ? 'GRATIS' : `${order.shippingCost.toFixed(2)} €`}</span>
            </div>
            <div className="flex justify-between font-bold text-primary border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>{order.total.toFixed(2)} €</span>
            </div>
          </div>

          {/* DPD Actions */}
          <div className="bg-blue-50 rounded-xl p-4 space-y-3">
            <h3 className="font-bold text-sm flex items-center gap-2"><Truck className="w-4 h-4 text-blue-600" /> DPD / Envío</h3>
            {order.trackingNumber ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="font-mono font-bold">{order.trackingNumber}</span>
                  <a
                    href={`https://tracking.dpd.de/status/es_ES/parcel/${order.trackingNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                  >
                    Seguimiento <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                {order.labelUrl && (
                  <a href={order.labelUrl} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <Download className="w-4 h-4" /> Descargar Etiqueta PDF
                  </a>
                )}
              </div>
            ) : (
              <button
                onClick={generateLabel}
                disabled={dpdLoading}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {dpdLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Tag className="w-4 h-4" />}
                Generar Etiqueta DPD
              </button>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nota interna</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Añadir nota interna..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              onClick={() => patch({ internalNote: note })}
              disabled={loading}
              className="mt-2 flex items-center gap-2 text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              Guardar nota
            </button>
          </div>

          {msg && <p className="text-sm font-medium text-center py-2 bg-green-50 text-green-700 rounded-lg">{msg}</p>}
        </div>
      </motion.div>
    </div>
  );
}
