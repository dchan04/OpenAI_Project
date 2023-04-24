using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RestSharp;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
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
        public string ChatGPT(string userMsg)
        {
            var param = "{\r\n    \"model\": \"gpt-3.5-turbo\",\r\n    \"messages\": [\r\n        {\r\n            \"role\": \"user\",\r\n            \"content\": \"" + userMsg + "\"\r\n        }\r\n    ]\r\n}";
            var client = new RestClient("https://openai80.p.rapidapi.com");
            var request = new RestRequest("chat/completions", Method.Post);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _config["OpenAi:Key"]);
            request.AddHeader("X-RapidAPI-Host", "openai80.p.rapidapi.com");
            request.AddParameter("application/json", param, ParameterType.RequestBody);
            RestResponse response = client.Execute(request);
            dynamic parseResponse = JObject.Parse(response.Content); 
            dynamic returnResponse = parseResponse.choices[0].message.content;
            return returnResponse;
        }

        [HttpPost]
        [Route("CreateEdit")]
        public string CreateEdit(string input, string instruction)
        {
            var param = "{\r\n    \"model\": \"text-davinci-edit-001\",\r\n    \"input\":\" " + input + " \",\r\n    \"instruction\": \" " + instruction + " \"\r\n}";
            var client = new RestClient("https://openai80.p.rapidapi.com");
            var request = new RestRequest("edits", Method.Post);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _config["OpenAi:Key"]);
            request.AddHeader("X-RapidAPI-Host", "openai80.p.rapidapi.com");
            request.AddParameter("application/json", param , ParameterType.RequestBody);
            RestResponse response = client.Execute(request);
            dynamic parseResponse = JObject.Parse(response.Content);
            dynamic returnResponse = parseResponse.choices[0].text;
            Console.Write(returnResponse);
            return returnResponse;
        }

        [HttpPost]
        [Route("AIMod")]
        public IActionResult AiModeration(string input, string model)
        {
            var client = new RestClient("https://openai80.p.rapidapi.com");
            var request = new RestRequest("moderations", Method.Post);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _config["OpenAi:Key"]);
            request.AddHeader("X-RapidAPI-Host", "openai80.p.rapidapi.com");
            request.AddParameter("application/json", "{\r\n    \"input\": \"I want to kill them.\",\r\n    \"model\": \"text-moderation-stable\"\r\n}", ParameterType.RequestBody);
            RestResponse response = client.Execute(request);
            dynamic parseResponse = JObject.Parse(response.Content);
            dynamic returnResponse = parseResponse.results[0].categories;
            return Ok(returnResponse);
        }
    }
}
