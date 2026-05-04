"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Order, PaymentStatus, ShippingStatus, ShippingZone } from '@/types/order';
import { OrderDetailModal } from '@/components/admin/OrderDetailModal';
import { RefreshCw, Filter, Package, Truck, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const PAY_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  failed: 'Fallido',
  refunded: 'Reembolsado',
};

const SHIP_STATUS_LABELS: Record<ShippingStatus, string> = {
  pending_label: 'Pendiente etiqueta',
  label_generated: 'Etiqueta generada',
  in_transit: 'En tránsito',
  delivered: 'Entregado',
  incident: 'Incidencia',
};

const ZONE_LABELS: Record<ShippingZone, string> = {
  peninsula: 'Península',
  baleares: 'Baleares',
  canarias: 'Canarias',
};

function payBadge(status: PaymentStatus) {
  const map: Record<PaymentStatus, string> = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
  };
  return map[status] || 'bg-gray-100 text-gray-700';
}

function shipBadge(status: ShippingStatus) {
  const map: Record<ShippingStatus, string> = {
    pending_label: 'bg-orange-100 text-orange-800',
    label_generated: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    incident: 'bg-red-100 text-red-800',
  };
  return map[status] || 'bg-gray-100 text-gray-700';
}

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [payFilter, setPayFilter] = useState('');
  const [shipFilter, setShipFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (payFilter) params.set('paymentStatus', payFilter);
    if (shipFilter) params.set('shippingStatus', shipFilter);
    if (zoneFilter) params.set('zone', zoneFilter);
    const res = await fetch(`/api/orders?${params}`);
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  }, [payFilter, shipFilter, zoneFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const stats = {
    total: orders.length,
    paid: orders.filter(o => o.paymentStatus === 'paid').length,
    inTransit: orders.filter(o => o.shippingStatus === 'in_transit').length,
    pendingLabel: orders.filter(o => o.shippingStatus === 'pending_label').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total pedidos', value: stats.total, icon: Package, color: 'text-primary' },
          { label: 'Pagados', value: stats.paid, icon: CheckCircle2, color: 'text-green-600' },
          { label: 'En tránsito', value: stats.inTransit, icon: Truck, color: 'text-blue-600' },
          { label: 'Sin etiqueta', value: stats.pendingLabel, icon: AlertCircle, color: 'text-orange-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
            <Icon className={`w-8 h-8 ${color}`} />
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + refresh */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-gray-400" />
        <select value={payFilter} onChange={e => setPayFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
          <option value="">Todos los pagos</option>
          {(Object.keys(PAY_STATUS_LABELS) as PaymentStatus[]).map(s => (
            <option key={s} value={s}>{PAY_STATUS_LABELS[s]}</option>
          ))}
        </select>
        <select value={shipFilter} onChange={e => setShipFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
          <option value="">Todos los envíos</option>
          {(Object.keys(SHIP_STATUS_LABELS) as ShippingStatus[]).map(s => (
            <option key={s} value={s}>{SHIP_STATUS_LABELS[s]}</option>
          ))}
        </select>
        <select value={zoneFilter} onChange={e => setZoneFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
          <option value="">Todas las zonas</option>
          {(Object.keys(ZONE_LABELS) as ShippingZone[]).map(z => (
            <option key={z} value={z}>{ZONE_LABELS[z]}</option>
          ))}
        </select>
        <button onClick={fetchOrders} className="ml-auto flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
          <RefreshCw className="w-4 h-4" /> Actualizar
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
            <Clock className="w-5 h-5 animate-spin" /> Cargando pedidos...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  {['Nº Pedido', 'Fecha', 'Cliente', 'Botellas', 'Destino', 'Total', 'Pago', 'Envío', 'Tracking'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => {
                  const bottleCount = order.items.reduce((s, i) => s + i.quantity, 0);
                  return (
                    <tr
                      key={order.id}
                      onClick={() => setSelected(order)}
                      className="hover:bg-primary/5 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-primary">{order.orderNumber}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{order.shippingAddress.fullName}</p>
                        <p className="text-xs text-gray-400">{order.shippingAddress.email}</p>
                      </td>
                      <td className="px-4 py-3 text-center font-bold">{bottleCount}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs">{ZONE_LABELS[order.shippingAddress.zone]}</span>
                        <p className="text-xs text-gray-400">{order.shippingAddress.city}</p>
                      </td>
                      <td className="px-4 py-3 font-bold">{order.total.toFixed(2)} €</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${payBadge(order.paymentStatus)}`}>
                          {PAY_STATUS_LABELS[order.paymentStatus]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${shipBadge(order.shippingStatus)}`}>
                          {SHIP_STATUS_LABELS[order.shippingStatus]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {order.trackingNumber ? (
                          <a
                            href={`https://tracking.dpd.de/status/es_ES/parcel/${order.trackingNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-blue-600 hover:underline text-xs font-mono"
                          >
                            {order.trackingNumber}
                          </a>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {orders.length === 0 && (
              <p className="text-center text-gray-400 py-12">No hay pedidos con estos filtros</p>
            )}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <OrderDetailModal
          order={selected}
          onClose={() => setSelected(null)}
          onUpdate={(updated) => {
            setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
            setSelected(updated);
          }}
        />
      )}
    </div>
  );
}
