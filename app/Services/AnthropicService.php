<?php 
    namespace App\Services;

    use Illuminate\Support\Facades\Http;

    class AnthropicService
    {
        private string $apiKey;
        private string $model = 'claude-haiku-4-5-20251001';

        public function __construct()
        {
            $this->apiKey = config('services.anthropic.key');
        }

        public function ask(string $prompt): string
        {
            $response = Http::withHeaders([
                'x-api-key' => $this->apiKey,
                'anthropic-version' => '2023-06-01',
                'content-type' => 'application/json',
            ])->post('https://api.anthropic.com/v1/messages', [
                'model' => $this->model,
                'max_tokens' => 1024,
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ],
            ]);

            return $response->json('content.0.text');
        }
    }