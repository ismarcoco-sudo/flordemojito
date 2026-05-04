import nodemailer from 'nodemailer';
import { Order } from '@/types/order';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: Number(process.env.MAIL_PORT) === 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://flordemojito.es';

export async function sendOrderConfirmationEmail(order: Order) {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} x ${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${(item.price * item.quantity).toFixed(2)} €</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #1B5E20; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-family: serif;">Flor de Mojito</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #1B5E20;">¡Tu pedido #${order.orderNumber} está confirmado!</h2>
        <p>Hola ${order.shippingAddress.fullName},</p>
        <p>Gracias por tu compra. Estamos preparando tu pedido en nuestra fábrica en Lyon.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f9f9f9;">
              <th style="padding: 10px; text-align: left;">Producto</th>
              <th style="padding: 10px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Subtotal</td>
              <td style="padding: 10px; text-align: right;">${order.subtotal.toFixed(2)} €</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Envío</td>
              <td style="padding: 10px; text-align: right;">${order.shippingCost === 0 ? 'GRATIS' : order.shippingCost.toFixed(2) + ' €'}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; font-size: 1.2em;">Total</td>
              <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 1.2em; color: #1B5E20;">${order.total.toFixed(2)} €</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 30px; padding: 20px; background-color: #f0f7f0; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #1B5E20;">Datos de Envío</h3>
          <p style="margin-bottom: 0;">
            ${order.shippingAddress.fullName}<br>
            ${order.shippingAddress.address}<br>
            ${order.shippingAddress.postalCode} ${order.shippingAddress.city}, ${order.shippingAddress.province}
          </p>
          <p style="margin-top: 10px; font-weight: bold;">Plazo estimado: 48-72h (Península)</p>
        </div>

        <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
          Recibirás un SMS de DPD Predict con la hora exacta de entrega una vez que el pedido esté en camino.
        </p>
      </div>
      <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 0.8em; color: #999;">
        &copy; 2026 Flor de Mojito · El auténtico sabor cubano
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Flor de Mojito" <${process.env.MAIL_USER}>`,
    to: order.shippingAddress.email,
    subject: `Tu pedido Flor de Mojito #${order.orderNumber} está confirmado`,
    html,
  });
}

export async function sendOrderShippedEmail(order: Order) {
  const trackingUrl = `https://tracking.dpd.de/status/es_ES/parcel/${order.trackingNumber}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #1B5E20; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-family: serif;">Flor de Mojito</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #1B5E20;">¡Tu Flor de Mojito está en camino!</h2>
        <p>Hola ${order.shippingAddress.fullName},</p>
        <p>Tu pedido ya ha salido de nuestra fábrica en Lyon y está en manos de DPD / SEUR.</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${trackingUrl}" style="background-color: #FFC107; color: #1B5E20; padding: 15px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Seguir mi pedido
          </a>
          <p style="margin-top: 15px; font-family: monospace; font-weight: bold;">Tracking: ${order.trackingNumber}</p>
        </div>

        <div style="padding: 20px; background-color: #f0f7f0; border-radius: 8px;">
          <p style="margin: 0;">
            <strong>DPD Predict:</strong> Recibirás un SMS hoy o mañana con la ventana horaria exacta (1 hora) de entrega.
          </p>
        </div>

        <p style="margin-top: 30px;">
          Plazo de entrega estimado: <strong>48-72h</strong>.
        </p>
      </div>
      <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 0.8em; color: #999;">
        &copy; 2026 Flor de Mojito · Lyon - España
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Flor de Mojito" <${process.env.MAIL_USER}>`,
    to: order.shippingAddress.email,
    subject: `Tu Flor de Mojito está en camino`,
    html,
  });
}

export async function sendAdminNotificationEmail(order: Order) {
  const adminEmail = process.env.ADMIN_EMAIL || 'ismar@flordemojito.es';
  const bottleCount = order.items.reduce((s, i) => s + i.quantity, 0);

  const html = `
    <div style="font-family: sans-serif;">
      <h2>Nuevo pedido #${order.orderNumber}</h2>
      <p><strong>Cliente:</strong> ${order.shippingAddress.fullName} (${order.shippingAddress.email})</p>
      <p><strong>Cantidad:</strong> ${bottleCount} botella(s)</p>
      <p><strong>Destino:</strong> ${order.shippingAddress.city}, ${order.shippingAddress.zone}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)} €</p>
      <p><strong>Método:</strong> ${order.paymentMethod}</p>
      <hr>
      <p><a href="${SITE_URL}/admin/pedidos">Ver en el Backoffice</a></p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Sistema Web" <${process.env.MAIL_USER}>`,
    to: adminEmail,
    subject: `Nuevo pedido #${order.orderNumber} — ${bottleCount} botella(s) → ${order.shippingAddress.city}, ${order.shippingAddress.zone}`,
    html,
  });
}
