import moment from "moment";
import { Marker, MarkerLabels } from "../../../components/map/marker/Marker.objects";
import { Expression } from "mapbox-gl";

/**
 * Returns text by label
 * @param {string} label - label
 * @param {Marker} marker - marker
 * @return {string} text
 * @category Helper
 * @public
 */
export function getTextByLabel(label: string, marker: Marker) {
    let text = '';

    switch (label) {
        case 'address':
            text = marker.location.street + ' ' + marker.location.houseNumber + ' ' + marker.location.busNumber + ', ' + marker.location.postalCode || '';
            break;
        case 'postalCode':
            text = marker.location.postalCode || '';
            break;
        case 'groups':
            text = marker[label].join(', ');
            break;
        case 'date':
            text = moment(marker.timestamp).format('DD.MM.YYYY');
            break;
        case 'dateTime':
            text = moment(marker.timestamp).format('DD.MM.YYYY HH:mm');
            break;
        case 'time':
            text = moment(marker.timestamp).format('HH:mm');
            break;
        case 'name':
            text = marker[label]?.toUpperCase() || ' ';
            break;
        case 'tags':
            text = marker.tags?.map(tag => tag).join(', ') || ' ';
            break;
        case "SMACluster":
            text = marker[label] || '';
            break;
        case "qlfFact":
            text = marker[label] || '';
            break;
        case "pvId":
            text = marker[label] || '';
            break;
        case "district":
            text = marker[label] || '';
            break;
        case "region":
            text = marker[label] || '';
            break;
        case "destination":
            text = marker[label] || '';
            break;
        default:
            text = '';
    }

    return text;
}


type LabelsDictionary = { [key: string]: MarkerLabels };

export const generateTextFieldExpression = (labelsDict: LabelsDictionary): Expression => {
    // Convert labelsDict to an array of label values
    const labels = Object.values(labelsDict)
    // Start with an empty 'format' expression array
    const formatExpression: Expression = ['format'];
    // Iterate over labels, adding each as a new line in the format expression
    labels.forEach((label, index) => {

        if (index > 0) {
            formatExpression.push('\n', {});
        }
        formatExpression.push(['get', label], { 'font-scale': (index === 0 ? 1.0 : 0.8) }); // Larger font for the first label
    });
    // Return the complete 'format' expression
    return formatExpression;
};