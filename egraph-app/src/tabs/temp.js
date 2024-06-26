
import { EGraph } from '../graph/graph';
import { Coordinates, generate_uuid_v4 } from '../graph/helpers';
import { Flow } from '../graph/flow';
import { Compartment } from '../graph/compartment';

var dagre = require("@xdashduck/dagre-tlayering");

/**
 * Генерация тестового графа, представляющий компартментальную модель.
 * @returns {[EGraph, dagre.graphlib.Graph]} 2 графа, представляющие собой 1. EGraph, 2. DagreGraph для отрисовки.
 */
export function generateGraphClass() {

    var g = new EGraph();

    g.AddComp(generate_uuid_v4(), { name: "Suspectable", population: 100, x: 100, y: 100})
        .AddComp(generate_uuid_v4(), {name: "I1nfected2", population: 1, x: 200, y: 200})
        .AddComp(generate_uuid_v4(), {name: "Infected1", population: 1, x: 300, y: 300})
        .AddComp(generate_uuid_v4(), {name: "Rejected", population: 0, x: 400, y: 400})
        .AddComp(generate_uuid_v4(), {name: "Dead", population: 0, x: 500, y: 600})

    g.setStartCompartment("Suspectable");

    g.AddFlow(generate_uuid_v4(), {from: "Suspectable", to: [
        {name: "I1nfected2", coef: 0.8}, {name:"Infected1",coef: 0.2}
    ], coef: 0.6});
    //[["Rejected", 0.2], ["Dead", 0.8]]
    g.AddFlow(generate_uuid_v4(), {from: "I1nfected2", to: [], coef: 0.5});
    g.AddFlow(generate_uuid_v4(), {from: "Infected1", to: [{name: "Rejected",coef: 1}], coef: 0.3});
    g.AddFlow(generate_uuid_v4(), {from: "Rejected", to: [{name: "Dead", coef: 1}], coef: 0.01});

    var gd = g.getDagreGraph({label_w: 100, node_w: 50, node_h: 50});

    return [g, gd];
}

/**
 * Временная генерация исходных узлов
 * @param {EGraph} e_graph - граф эпидемиологической модели.
 */
export function getInitialNodes(e_graph) {

    var initial_nodes = [];
    let coord_index = 0;
    e_graph.GetComps().forEach((value, key) => {
        coord_index += 100;
        initial_nodes.push(
            {
                id: key, type: 'compartmentNode',
                position: value.GetPosition(),
                data: {
                    population: value.GetPopulation(),
                    name: value.GetName(),
                    obj: value,
                    ins: 0,
                    outs: 0
                }
            }
        )
    });
    return initial_nodes;

}
