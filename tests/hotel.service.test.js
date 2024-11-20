jest.mock('../src/models/hotel.model', () => ({
  findAndCountAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
}));

jest.mock('../src/config/redisClient.config', () => ({
  setEx: jest.fn(),
}));

const hotelService = require('../src/services/hotel.service');
const Hotel = require('../src/models/hotel.model');

describe('hotelService.getHotels', () => {
  it('should return a list of hotels', async () => {
    const mockData = { rows: [{ id: 1, name: 'Hotel A' }], count: 1 };
    Hotel.findAndCountAll.mockResolvedValue(mockData);

    const result = await hotelService.getHotels();
    expect(Hotel.findAndCountAll).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });
});

const redisClient = require('../src/config/redisClient.config');

describe('hotelService.getHotelbyId', () => {
  it('should return a hotel by id and set cache', async () => {
    const mockHotel = { id: 1, name: 'Hotel A' };
    Hotel.findByPk.mockResolvedValue(mockHotel);

    const result = await hotelService.getHotelbyId(1);
    expect(Hotel.findByPk).toHaveBeenCalledWith(1);
    expect(redisClient.setEx).toHaveBeenCalledWith(
      'hotel:1',
      3600,
      JSON.stringify(mockHotel),
    );
    expect(result).toEqual(mockHotel);
  });

  it('should throw an error if hotel not found', async () => {
    Hotel.findByPk.mockResolvedValue(null);

    await expect(hotelService.getHotelbyId(999)).rejects.toThrow(
      'hotel_not_found',
    );
  });
});

describe('hotelService.createHotel', () => {
  it('should create a hotel successfully', async () => {
    const mockHotel = { name: 'Hotel B', address: 'Address B' };
    Hotel.create.mockResolvedValue(mockHotel);

    const result = await hotelService.createHotel(mockHotel);
    expect(Hotel.create).toHaveBeenCalledWith(mockHotel);
    expect(result).toEqual(mockHotel);
  });
});

describe('hotelService.approveHotel', () => {
  it('should approve a hotel if it exists', async () => {
    const mockHotel = { id: 1, isApproved: 0, save: jest.fn() };
    Hotel.findByPk.mockResolvedValue(mockHotel);

    await hotelService.approveHotel(1);
    expect(mockHotel.isApproved).toBe(1);
    expect(mockHotel.save).toHaveBeenCalled();
  });

  it('should throw an error if hotel does not exist', async () => {
    Hotel.findByPk.mockResolvedValue(null);

    await expect(hotelService.approveHotel(999)).rejects.toThrow(
      'hotel_not_found',
    );
  });
});
