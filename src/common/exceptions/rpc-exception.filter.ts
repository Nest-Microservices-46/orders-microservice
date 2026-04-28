import { Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

// @Catch(RpcException) le indica a NestJS que este filtro de excepciones 
// solo debe ejecutarse cuando ocurra un error del tipo RpcException 
// (excepciones que provienen de los microservicios).
@Catch(RpcException)
export class ExceptionFilter implements ExceptionFilter {

    // El método catch se ejecuta automáticamente cuando se lanza la excepción.
    // Recibe la excepción en sí y el host, que contiene el contexto de la petición.
    catch(exception: RpcException, host: ArgumentsHost) {

        // Cambiamos el contexto a HTTP para poder manipular la respuesta
        // que le vamos a enviar al cliente final (el navegador, frontend, etc)
        const ctx = host.switchToHttp();

        // Obtenemos el objeto de respuesta nativo (Express) para enviar el JSON
        const response = ctx.getResponse();

        // Extraemos el detalle del error que mandó originalmente el microservicio
        const message = exception.getError();

        if (typeof message === 'object' && message !== null && 'status' in message && 'message' in message) {
            const status = isNaN(+ (message as any).status) ? 400 : + (message as any).status;
            return response.status(status).json(message);
        }

        // Construimos y enviamos la respuesta HTTP al cliente, 
        // forzando un estado 400 (Bad Request) e incluyendo el mensaje del microservicio.
        response.status(400).json({
            status: 400,
            message,
        });
    }
}
