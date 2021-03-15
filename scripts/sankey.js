const height = 272;
const width = 272;
const margins = { top: 50, bottom: 50, left: 50, right: 50 };

function draw(data) {
  const svg = d3
    .select("#sankey")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("stroke", "#000")
    .selectAll("rect")
    .data(data.nodes)
    .join("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("fill", "black");
  const link = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke-opacity", 0.5)
    .selectAll("g")
    .data(data.links)
    .join("g")
    .style("mix-blend-mode", "multiply");

  link
    .append("path")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", "black")
    .attr("stroke-width", d => d.width)
    // .attr("stroke-width", (d) => Math.max(1, d.width));
    
}
function sankey(data){
    const sankeyGenerator = d3.sankey()
        .nodeId(d => d.node)
        .nodeWidth(4)
        .nodePadding(0)
        // .nodeAlign(({align}) => align)
        .extent([[1, 1], [width, height]]);
        return (({nodes, links}) => sankeyGenerator({
            nodes: nodes.map(d => Object.assign({}, d)),
            links: links.map(d => Object.assign({}, d))
          }))(data);
  }


function loadData() {
  d3.json("./data/sankey.json").then((data) => {
    console.log(data);

    console.log(sankey(data))
    draw(sankey(data));
});
}
loadData();
