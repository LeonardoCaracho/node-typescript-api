import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormglassNormalizedResponseFixture from '@test/fixtures/stormglass_normalized_response_3_hours';
import * as stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours';

jest.mock('axios');

describe('StormGlass client', () => {
  it('should return the normalized forecast from the stormGlass service', async () => {
    const lat = -33.565656;
    const lng = 154.343434;

    axios.get = jest.fn().mockResolvedValue(stormGlassWeather3HoursFixture);

    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual(stormglassNormalizedResponseFixture);
  });
});
