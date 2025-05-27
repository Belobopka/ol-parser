class Fetch {
  async fetchHtml(html: string) {
    const result = await fetch(html);

    return result.text();
  }

  readResponse(response: Response) {
    return response.text();
  }
}

export default Fetch;
