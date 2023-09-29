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
            var result = await api.Chat.CreateChatCompletionAsync(userMsg);
            return Ok(result.Choices[0].Message.Content);
        }
        
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
