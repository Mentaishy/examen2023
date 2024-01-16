import { readAllTopics } from "../../model/view";

const ViewPage = async () => {
  const main = document.querySelector('main');

  try {
    const [queries] = await Promise.all([readAllTopics()]);

    console.log('Queries from backend:', queries); // Ajoutez cette ligne pour débogage

    const tableHtml = generateTableHtml(queries);
    main.innerHTML = tableHtml;
  } catch (error) {
    console.error('Error fetching data:', error);
    main.innerHTML = '<p class="p-5"> Error fetching data</p>';
  }
};

function generateTableHtml(queries) {
  console.log('Queries inside generateTableHtml:', queries);

  if (!queries || !Array.isArray(queries)) {
    return '<p class="p-5"> No queries yet : (</p>';
  }

  // Vérifier si queries est un tableau
  if (!Array.isArray(queries)) {
    console.error('Error: queries is not an array');
    return '<p class="p-5"> Error fetching data</p>';
  }

  const tableRows = queries.map(query => `
    <tr>
      <td class="text-info">${query.id}</td>
      <td class="fw-bold text-info">${query.subject}</td>
      <td class="text-info">${query.status}</td>
    </tr>
  `).join('');

  return `
    <div class="table-responsive p-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Subject</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>`;
}

export default ViewPage;
