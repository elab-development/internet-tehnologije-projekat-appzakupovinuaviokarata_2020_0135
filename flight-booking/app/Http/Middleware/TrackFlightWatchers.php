namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Redis;

class TrackFlightWatchers
{
    public function handle($request, Closure $next)
    {
        $flightId = $request->route('flightId'); // Pretpostavka da flightId dolazi kao parametar u ruti

        if ($flightId) {
            $redisKey = 'flight:watchers:' . $flightId;
            Redis::incr($redisKey);

            $response = $next($request);

            // Kada se odgovor pošalje, smanji brojač
            Redis::decr($redisKey);

            return $response;
        }

        return $next($request);
    }
}
