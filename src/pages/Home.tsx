import { useHealth } from '@/hooks/useHealth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

export const Home = () => {
  const { data, isLoading, error, refetch } = useHealth();

  const isOnline = data?.status === 'UP';

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-gray-900">Deskly</h1>
          <p className="text-xl text-gray-600">Backend Status</p>
        </div>

        <Card className="w-96 mx-auto shadow-lg">
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
                <p className="text-gray-600">Verificando status...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="text-5xl">❌</div>
                <p className="text-gray-900 font-medium">
                  Não foi possível conectar à API
                </p>
                <Button onClick={() => refetch()} variant="outline" size="lg">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar
                </Button>
              </div>
            ) : isOnline ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="text-5xl">🟢</div>
                <p className="text-gray-900 font-medium text-lg">
                  Backend Online
                </p>
                <Button onClick={() => refetch()} variant="outline" size="lg">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="text-5xl">🔴</div>
                <p className="text-gray-900 font-medium text-lg">
                  Backend Offline
                </p>
                <Button onClick={() => refetch()} variant="outline" size="lg">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
