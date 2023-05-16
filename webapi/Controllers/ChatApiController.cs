using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("[api]/")]
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
        public async Task<IActionResult> ChatGPTAsync(string userMsg)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://openai80.p.rapidapi.com/chat/completions"),
                Headers =
                {
                    { "X-RapidAPI-Key", _config["OpenAi:Key"] },
                    { "X-RapidAPI-Host", "openai80.p.rapidapi.com" },
                },
                Content = new StringContent("{\r\n    \"model\": \"gpt-3.5-turbo\",\r\n    \"messages\": [\r\n        {\r\n            \"role\": \"user\",\r\n            \"content\": \"" +  userMsg  + "\"\r\n        }\r\n    ]\r\n}")
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
                dynamic returnObj = content.choices[0].message.content;
                return Ok(returnObj);
            }
        }

        [HttpPost]
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

        [HttpPost]
        [Route("AIMod")]
        public async Task<IActionResult> AiModeration(string input)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://openai80.p.rapidapi.com/moderations"),
                Headers =
                {
                    { "X-RapidAPI-Key", _config["OpenAi:Key"] },
                    { "X-RapidAPI-Host", "openai80.p.rapidapi.com" },
                },
                Content = new StringContent("{\r\n    \"input\": \"" + input + "\",\r\n    \"model\": \"text-moderation-stable\"\r\n}")
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
                dynamic returnObj = content.results[0];
                return Ok(returnObj);
            }
        }

        [HttpPost]
        [Route("CreateEdit")]
        public async Task<IActionResult> CreateEdit(string input, string instruction)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://openai80.p.rapidapi.com/edits"),
                Headers =
                {
                    { "X-RapidAPI-Key", _config["OpenAi:Key"] },
                    { "X-RapidAPI-Host", "openai80.p.rapidapi.com" },
                },
                Content = new StringContent("{\r\n    \"model\": \"text-davinci-edit-001\",\r\n    \"input\": \"" + input +"\",\r\n    \"instruction\": \"" + instruction + "\"\r\n}")
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
                dynamic returnObj = content.choices[0];
                return Ok(returnObj);
            }
        }
    }
}
