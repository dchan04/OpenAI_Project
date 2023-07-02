using Microsoft.AspNetCore.Mvc;
 
namespace webapi.Controllers
{
    [ApiController]
    public class ChatApiController : ControllerBase
    {
        private readonly IConfiguration _config;
        public ChatApiController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        [Route("ChatGpt")]
        public async Task<IActionResult> ChatGPT(string userMsg)
        {
            var api = new OpenAI_API.OpenAIAPI(_config["OpenAiKey"]);
            var result = await api.Completions.GetCompletion(userMsg);
            return Ok(result);
        }

        /*[HttpPost]
        [Route("ImageGen")]
        public async Task<IActionResult> ImageGeneration(string prompt, int num)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://openai80.p.rapidapi.com/images/generations"),
                Headers =
                {
                    { "X-RapidAPI-Key", _config["OpenAi:Key"]},
                    { "X-RapidAPI-Host", "openai80.p.rapidapi.com" },
                },
                Content = new StringContent("{\r\n    \"prompt\": \""+ prompt + "\",\r\n    \"n\": " + num + ",\r\n    \"size\": \"1024x1024\"\r\n}")
                {
                    Headers =
                    {
                        ContentType = new MediaTypeHeaderValue("application/json")
                    }
                }
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                dynamic content = JObject.Parse(body);
                dynamic returnObj = content.data;
                Console.Write(returnObj);
                return Ok(returnObj);
            }
        }

        */
        [HttpPost]
        [Route("AIMod")]
        public async Task<IActionResult> AiModeration(string input)
        {
            var api = new OpenAI_API.OpenAIAPI(_config["OpenAiKey"]);
            var result = await api.Moderation.CallModerationAsync(input);
            return Ok(result.Results[0]);

        }
    }
}
